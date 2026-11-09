"""Blender scene: tight on a CRT running the whale battle, pull back to the room.

Run:  blender -b --factory-startup -P crt_desk.py -- [--preview|--render]
Preview renders frames 1 and 168 only, for framing checks.
"""

import math
import os
import sys

import bpy
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
TEX = os.path.join(os.path.dirname(HERE), "textures")
OUT = os.path.join(os.path.dirname(HERE), "renders", "crt")
MODELS = os.path.join(os.path.dirname(HERE), "models", "Models", "GLTF format")
FPS = 24
DURATION = 7.0
FRAMES = int(FPS * DURATION)
SAMPLES = 12
RES = (1280, 720)
SWAP_FRAME = 58  # battle -> GAME OVER


def clear():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for block in (bpy.data.materials, bpy.data.images):
        for item in list(block):
            if item.users == 0:
                block.remove(item)


def mat(name, color, rough=0.55, metallic=0.0, emission=None, strength=1.0):
    m = bpy.data.materials.get(name)
    if m:
        return m
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1)
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metallic
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1)
        bsdf.inputs["Emission Strength"].default_value = strength
    return m


def box(name, size, loc, material, rot=(0, 0, 0), bevel=0.004):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    ob = bpy.context.object
    ob.name = name
    ob.scale = size
    ob.rotation_euler = rot
    ob.data.materials.append(material)
    if bevel:
        b = ob.modifiers.new("bevel", "BEVEL")
        b.width = bevel
        b.segments = 2
    return ob


def cyl(name, radius, depth, loc, material, rot=(0, 0, 0), verts=32):
    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=depth, location=loc, vertices=verts)
    ob = bpy.context.object
    ob.name = name
    ob.rotation_euler = rot
    ob.data.materials.append(material)
    return ob


def screen_mat(path_a, path_b, strength=2.4):
    """One screen surface, two textures, mixed by a keyframable Value node."""
    m = bpy.data.materials.new("screen")
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    mix = nt.nodes.new("ShaderNodeMixShader")
    val = nt.nodes.new("ShaderNodeValue")
    val.name = "Swap"
    val.label = "Swap"
    emit_a = nt.nodes.new("ShaderNodeEmission")
    emit_b = nt.nodes.new("ShaderNodeEmission")
    tex_a = nt.nodes.new("ShaderNodeTexImage")
    tex_b = nt.nodes.new("ShaderNodeTexImage")
    tex_a.image = bpy.data.images.load(path_a, check_existing=True)
    tex_b.image = bpy.data.images.load(path_b, check_existing=True)
    for tex in (tex_a, tex_b):
        tex.interpolation = "Cubic"
    for emit in (emit_a, emit_b):
        emit.inputs["Strength"].default_value = strength
    nt.links.new(tex_a.outputs["Color"], emit_a.inputs["Color"])
    nt.links.new(tex_b.outputs["Color"], emit_b.inputs["Color"])
    nt.links.new(val.outputs[0], mix.inputs["Fac"])
    nt.links.new(emit_a.outputs["Emission"], mix.inputs[1])
    nt.links.new(emit_b.outputs["Emission"], mix.inputs[2])
    nt.links.new(mix.outputs["Shader"], out.inputs["Surface"])
    return m



def prop(name, loc, rot_z=0.0, scale=1.78):
    """Import a Kenney CC0 GLB, join it, and drop it at loc (bottom-centre)."""
    path = os.path.join(MODELS, name + ".glb")
    if not os.path.exists(path):
        print("MISSING MODEL", name)
        return None
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path)
    new = [o for o in bpy.data.objects if o not in before]
    meshes = [o for o in new if o.type == "MESH"]
    if not meshes:
        return None
    bpy.ops.object.select_all(action="DESELECT")
    for o in meshes:
        o.select_set(True)
    bpy.context.view_layer.objects.active = meshes[0]
    if len(meshes) > 1:
        bpy.ops.object.join()
    ob = bpy.context.object
    bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="BOUNDS")
    ob.scale = (scale, scale, scale)
    ob.rotation_euler = (0, 0, rot_z)
    ob.location = loc
    ob.name = name
    return ob


def build():
    clear()
    scene = bpy.context.scene

    wood = mat("wood", (0.055, 0.032, 0.020), rough=0.42)
    wood_dark = mat("wood_dark", (0.026, 0.016, 0.011), rough=0.5)
    wall = mat("wall", (0.045, 0.043, 0.041), rough=0.9)
    plastic = mat("plastic", (0.135, 0.125, 0.11), rough=0.5)
    plastic_dark = mat("plastic_dark", (0.018, 0.018, 0.020), rough=0.5)
    paper = mat("paper", (0.55, 0.53, 0.49), rough=0.85)
    metal = mat("metal", (0.25, 0.24, 0.22), rough=0.35, metallic=0.8)
    ceramic = mat("ceramic", (0.16, 0.17, 0.18), rough=0.32)
    cloth = mat("cloth", (0.06, 0.055, 0.05), rough=0.95)

    # room shell
    box("floor", (5.0, 4.0, 0.04), (0, 0.8, -0.02), wood_dark, bevel=0)
    box("wall_back", (5.0, 0.04, 3.0), (0, 1.05, 1.5), wall, bevel=0)
    box("wall_left", (0.04, 4.0, 3.0), (-1.7, 0.8, 1.5), wall, bevel=0)
    box("wall_right", (0.04, 4.0, 3.0), (2.05, 0.8, 1.5), wall, bevel=0)
    box("ceiling", (5.0, 4.0, 0.04), (0, 0.8, 2.62), wall, bevel=0)

    # window on the back wall, cool night light
    win = box("window", (0.95, 0.02, 0.72), (0.55, 1.02, 1.55), mat("night", (0.05, 0.09, 0.14), rough=0.3, emission=(0.30, 0.45, 0.62), strength=0.55), bevel=0)
    for i, (w, h, x, z) in enumerate([
        (0.03, 0.72, 0.55 - 0.475, 1.55), (0.03, 0.72, 0.55 + 0.0, 1.55),
        (0.03, 0.72, 0.55 + 0.475, 1.55), (0.95, 0.03, 0.55, 1.55),
    ]):
        box(f"mullion{i}", (w, 0.05, h), (x, 1.00, z), wood_dark, bevel=0)

    # desk
    box("desk_top", (1.05, 0.42, 0.035), (0, 0.0, 0.735), wood)
    for i, (x, y) in enumerate([(-0.9, -0.3), (0.9, -0.3), (-0.9, 0.3), (0.9, 0.3)]):
        box(f"leg{i}", (0.05, 0.05, 0.72), (x, y, 0.36), wood_dark, bevel=0)

    # monitor body + stand
    box("crt_body", (0.40, 0.30, 0.32), (0, 0.16, 0.92), plastic, bevel=0.012)
    box("crt_bezel", (0.385, 0.02, 0.305), (0, 0.005, 0.92), plastic_dark, bevel=0.008)
    cyl("crt_neck", 0.05, 0.06, (0, 0.17, 0.76), plastic_dark)
    box("crt_base", (0.24, 0.20, 0.02), (0, 0.15, 0.745), plastic_dark, bevel=0.006)

    # one screen surface, two textures, mixed by a keyframed Value node
    screen = screen_mat(os.path.join(TEX, "battle.png"), os.path.join(TEX, "gameover.png"))
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, -0.0075, 0.925), rotation=(math.radians(90), 0, 0))
    s1 = bpy.context.object
    s1.name = "screen"
    s1.scale = (0.335, 0.252, 1)
    s1.data.materials.append(screen)
    swap = screen.node_tree.nodes["Swap"].outputs[0]
    for f, v in ((1, 0.0), (SWAP_FRAME - 1, 0.0), (SWAP_FRAME + 1, 1.0)):
        swap.default_value = v
        swap.keyframe_insert("default_value", frame=f)

    # keyboard, mouse, papers, mug, books
    box("keyboard", (0.44, 0.15, 0.018), (0, -0.12, 0.762), plastic_dark, bevel=0.005)
    box("keys", (0.40, 0.125, 0.004), (0, -0.12, 0.773), mat("keys", (0.10, 0.10, 0.105), rough=0.6), bevel=0.002)
    box("mouse", (0.06, 0.10, 0.028), (0.30, -0.10, 0.767), plastic_dark, bevel=0.012)
    for i, (x, y, r) in enumerate([(-0.30, -0.16, 0.12), (-0.33, -0.13, -0.08), (0.34, 0.05, 0.18)]):
        box(f"paper{i}", (0.21, 0.28, 0.0015), (x, y, 0.755), paper, rot=(0, 0, r), bevel=0)
    cyl("mug", 0.042, 0.095, (0.36, -0.16, 0.80), ceramic)
    bpy.ops.mesh.primitive_torus_add(location=(0.402, -0.16, 0.80), major_radius=0.028, minor_radius=0.007, major_segments=24, minor_segments=8)
    bpy.context.object.data.materials.append(ceramic)
    for i, (w, h, x) in enumerate([(0.035, 0.24, -0.55), (0.045, 0.21, -0.49), (0.03, 0.26, -0.43)]):
        box(f"book{i}", (w, 0.17, h), (x, 0.30, 0.735 + h / 2), mat(f"book{i}", (0.10 + i * 0.03, 0.05, 0.04), rough=0.7), bevel=0.002)

    # desk lamp (left) with warm light
    cyl("lamp_base", 0.075, 0.02, (-0.62, 0.05, 0.755), metal)
    cyl("lamp_arm", 0.008, 0.42, (-0.62, 0.05, 0.96), metal, rot=(math.radians(12), 0, 0))
    bpy.ops.mesh.primitive_cone_add(vertices=24, radius1=0.10, radius2=0.035, depth=0.11, location=(-0.60, -0.01, 1.16))
    shade = bpy.context.object
    shade.rotation_euler = (math.radians(28), 0, math.radians(-18))
    shade.data.materials.append(mat("shade", (0.12, 0.09, 0.06), rough=0.5))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.032, location=(-0.60, -0.01, 1.13))
    bulb = bpy.context.object
    bulb.data.materials.append(mat("bulb", (1, 0.85, 0.6), emission=(1.0, 0.78, 0.5), strength=18))


    # ---- Kenney CC0 low-poly bedroom props (models/kenney, licence: CC0) ----
    prop("bedSingle", (1.30, 0.30, 0.0), rot_z=math.radians(-90))
    prop("bookcaseClosedWide", (-0.95, 0.93, 0.0), rot_z=math.radians(180))
    prop("bookcaseOpen", (-0.32, 0.94, 0.0), rot_z=math.radians(180))
    prop("rugRectangle", (0.05, -0.62, 0.004), rot_z=0)
    prop("chairDesk", (-0.66, -0.38, 0.0), rot_z=math.radians(150))
    prop("plantSmall1", (-1.32, 0.62, 0.0))
    prop("plantSmall2", (0.46, 0.10, 0.757), scale=0.9)
    prop("books", (-0.20, 0.10, 0.753), rot_z=math.radians(14), scale=1.1)
    prop("cardboardBoxClosed", (-1.25, 0.20, 0.0), rot_z=math.radians(-12))
    prop("lampRoundFloor", (-1.34, -0.25, 0.0))

    # floor lamp bulb + warm practical
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.045, location=(-1.34, -0.25, 1.52))
    bulb2 = bpy.context.object
    bulb2.data.materials.append(mat("bulb_warm", (1, 0.82, 0.6), emission=(1.0, 0.72, 0.42), strength=10))
    bpy.ops.object.light_add(type="POINT", location=(-1.34, -0.25, 1.52))
    pl = bpy.context.object
    pl.data.energy = 14
    pl.data.color = (1.0, 0.74, 0.48)
    pl.data.shadow_soft_size = 0.08

    # lights
    bpy.ops.object.light_add(type="AREA", location=(-0.60, -0.02, 1.17))
    lamp = bpy.context.object
    lamp.data.energy = 26
    lamp.data.size = 0.18
    lamp.data.color = (1.0, 0.78, 0.55)
    lamp.rotation_euler = (math.radians(60), 0, math.radians(-20))

    bpy.ops.object.light_add(type="AREA", location=(0.55, 0.55, 1.6))
    win_light = bpy.context.object
    win_light.data.energy = 95
    win_light.data.size = 0.9
    win_light.data.color = (0.55, 0.70, 0.95)
    win_light.rotation_euler = (math.radians(-70), 0, 0)

    bpy.ops.object.light_add(type="AREA", location=(0.0, -0.22, 0.93))
    glow = bpy.context.object
    glow.data.energy = 2.2
    glow.data.size = 0.30
    glow.data.color = (0.55, 0.72, 0.95)
    glow.rotation_euler = (math.radians(90), 0, 0)

    bpy.ops.object.light_add(type="AREA", location=(0.0, 0.2, 2.45))
    ceil = bpy.context.object
    ceil.data.energy = 30
    ceil.data.size = 1.6
    ceil.data.color = (1.0, 0.86, 0.70)
    ceil.rotation_euler = (math.radians(180), 0, 0)

    # world
    world = bpy.data.worlds["World"]
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.004, 0.005, 0.007, 1)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 1.0

    # camera + target
    bpy.ops.object.empty_add(location=(0, 0.15, 0.93))
    target = bpy.context.object
    target.name = "CamTarget"
    bpy.ops.object.camera_add(location=(0, -0.50, 0.945))
    cam = bpy.context.object
    cam.data.lens = 50
    cam.data.sensor_width = 36
    cam.data.dof.use_dof = True
    cam.data.dof.focus_object = target
    cam.data.dof.aperture_fstop = 2.8
    con = cam.constraints.new("TRACK_TO")
    con.target = target
    con.track_axis = "TRACK_NEGATIVE_Z"
    con.up_axis = "UP_Y"
    scene.camera = cam

    def key(ob, path, frame, value):
        setattr(ob, path, value)
        ob.keyframe_insert(path, frame=frame)

    key(cam, "location", 1, (0.0, -0.637, 0.928))
    key(cam.data, "lens", 1, 50.0)
    key(cam.data, "lens", FRAMES, 34.0)
    key(cam, "location", FRAMES, (0.72, -1.92, 1.30))
    key(target, "location", 1, (0, 0.15, 0.925))
    key(target, "location", FRAMES, (0.06, 0.30, 0.80))

    # Blender 5.x slotted actions no longer expose action.fcurves; the default
    # bezier + auto-clamped handles already give the eased move we want.

    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = SAMPLES
    scene.cycles.use_denoising = True
    scene.cycles.max_bounces = 4
    scene.cycles.diffuse_bounces = 2
    scene.cycles.glossy_bounces = 2
    scene.cycles.transmission_bounces = 2
    scene.cycles.use_fast_gi = True
    scene.render.resolution_x, scene.render.resolution_y = RES
    scene.render.resolution_percentage = 100
    scene.render.fps = FPS
    scene.frame_start, scene.frame_end = 1, FRAMES
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Medium High Contrast"
    scene.view_settings.exposure = -0.55
    scene.render.image_settings.file_format = "PNG"
    scene.render.filepath = os.path.join(OUT, "f_")
    scene.render.film_transparent = False

    os.makedirs(OUT, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, "crt_desk.blend"))
    return scene, cam


def main():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    scene, cam = build()
    if "--preview" in argv:
        for f in (1, FRAMES):
            scene.frame_set(f)
            scene.render.filepath = os.path.join(OUT, f"preview_{f:04d}.png")
            bpy.ops.render.render(write_still=True)
            print("PREVIEW", scene.render.filepath, flush=True)
    else:
        bpy.ops.render.render(animation=True)


if __name__ == "__main__":
    main()
