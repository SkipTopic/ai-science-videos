"""Blender scene: the 1986 mechanical dinosaur on a Tokyo rooftop at night.

Run: blender -b --factory-startup -P mecha_dino.py -- [--preview|--render]
"""

import math
import os
import random
import sys

import bpy
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
BL = os.path.dirname(HERE)
OUT = os.path.join(BL, "renders", "dino")
CITY = os.path.join(BL, "models", "Models", "GLB format")
FPS = 24
FRAMES = 120
SAMPLES = 14
RES = (1280, 720)


def clear():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)


def mat(name, color, rough=0.5, metallic=0.0, emission=None, strength=1.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*color, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metallic
    if emission:
        b.inputs["Emission Color"].default_value = (*emission, 1)
        b.inputs["Emission Strength"].default_value = strength
    return m


def box(name, size, loc, material, rot=(0, 0, 0), bevel=0.02):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    ob = bpy.context.object
    ob.name = name
    ob.scale = size
    ob.rotation_euler = rot
    ob.data.materials.append(material)
    if bevel:
        m = ob.modifiers.new("bev", "BEVEL")
        m.width = bevel
        m.segments = 2
    return ob


def cyl(name, r, d, loc, material, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=d, location=loc, vertices=16)
    ob = bpy.context.object
    ob.name = name
    ob.rotation_euler = rot
    ob.data.materials.append(material)
    return ob


def building(name, loc, scale, rot_z=0.0):
    path = os.path.join(CITY, name + ".glb")
    if not os.path.exists(path):
        print("MISSING", name)
        return None
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path)
    new = [o for o in bpy.data.objects if o not in before and o.type == "MESH"]
    if not new:
        return None
    bpy.ops.object.select_all(action="DESELECT")
    for o in new:
        o.select_set(True)
    bpy.context.view_layer.objects.active = new[0]
    if len(new) > 1:
        bpy.ops.object.join()
    ob = bpy.context.object
    bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="BOUNDS")
    ob.scale = (scale, scale, scale)
    ob.rotation_euler = (0, 0, rot_z)
    ob.location = (loc[0], loc[1], 0)
    # windows glow: reuse the texture as emission, drop the albedo
    for slot in ob.material_slots:
        m = slot.material
        if not m or not m.use_nodes:
            continue
        nt = m.node_tree
        tex = next((n for n in nt.nodes if n.type == "TEX_IMAGE"), None)
        bsdf = next((n for n in nt.nodes if n.type == "BSDF_PRINCIPLED"), None)
        if not tex or not bsdf:
            continue
        bsdf.inputs["Base Color"].default_value = (0.018, 0.020, 0.028, 1)
        bsdf.inputs["Roughness"].default_value = 0.75
        mul = nt.nodes.new("ShaderNodeMixRGB")
        mul.blend_type = "MULTIPLY"
        mul.inputs["Fac"].default_value = 1.0
        mul.inputs["Color2"].default_value = (1.0, 0.78, 0.52, 1)
        nt.links.new(tex.outputs["Color"], mul.inputs["Color1"])
        nt.links.new(mul.outputs["Color"], bsdf.inputs["Emission Color"])
        bsdf.inputs["Emission Strength"].default_value = 0.16
    return ob


def build():
    clear()
    scene = bpy.context.scene
    random.seed(7)

    concrete = mat("concrete", (0.05, 0.05, 0.055), rough=0.9)
    concrete_dark = mat("concrete_dark", (0.022, 0.022, 0.025), rough=0.95)
    steel = mat("steel", (0.10, 0.105, 0.115), rough=0.44, metallic=0.55)
    steel_light = mat("steel_light", (0.15, 0.16, 0.18), rough=0.4, metallic=0.45)
    rust = mat("rust", (0.09, 0.035, 0.02), rough=0.7, metallic=0.2)
    glow_red = mat("eye", (0.5, 0.02, 0.01), emission=(1.0, 0.06, 0.03), strength=40)
    window = mat("window_warm", (0.2, 0.15, 0.08), emission=(1.0, 0.72, 0.40), strength=1.4)

    # rooftop
    box("roof", (70, 70, 1.0), (0, 0, -0.5), concrete, bevel=0)
    box("parapet_n", (70, 0.8, 1.2), (0, 33, 0.6), concrete_dark, bevel=0.02)
    for i, (x, y, w, h) in enumerate([(-20, 12, 6, 2.4), (18, 6, 4, 1.6), (-6, 26, 5, 2.0)]):
        box(f"hut{i}", (w, 4, h), (x, y, h / 2), concrete_dark, bevel=0.03)
    cyl("vent", 1.4, 2.2, (10, 14, 1.1), steel_light)
    cyl("antenna", 0.12, 9, (-16, 18, 4.5), steel)

    # ---- mechanical tyrannosaur (about 12 m tall) ----
    box("pelvis", (4.6, 6.2, 4.4), (0, 0, 6.4), steel, rot=(math.radians(-6), 0, 0), bevel=0.35)
    box("chest", (4.0, 5.0, 4.8), (0, -2.0, 8.6), steel_light, rot=(math.radians(14), 0, 0), bevel=0.3)
    box("neck", (2.2, 2.0, 3.0), (0, -4.4, 10.6), steel, rot=(math.radians(28), 0, 0), bevel=0.2)
    box("head", (2.4, 4.2, 2.2), (0, -6.2, 12.0), steel_light, rot=(math.radians(6), 0, 0), bevel=0.25)
    box("jaw", (2.0, 3.4, 0.8), (0, -6.6, 11.0), steel, rot=(math.radians(10), 0, 0), bevel=0.1)
    for i in range(6):
        x = -0.75 + i * 0.3
        cyl(f"tooth{i}", 0.09, 0.42, (x, -7.5, 11.35), steel_light, rot=(math.radians(90), 0, 0))
    # eyes
    for side in (-1, 1):
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.22, location=(side * 0.95, -7.3, 12.6))
        e = bpy.context.object
        e.data.materials.append(glow_red)
    # brow plates
    box("brow", (2.6, 1.2, 0.4), (0, -7.0, 12.85), rust, rot=(math.radians(12), 0, 0), bevel=0.06)

    # tail: four tapering segments
    tail = [((0, 3.6, 6.0), (2.6, 4.2, 2.6), -18), ((0, 6.6, 5.2), (2.0, 4.4, 2.0), -12),
            ((0, 9.6, 4.3), (1.4, 4.0, 1.4), -8), ((0, 12.2, 3.4), (0.8, 3.4, 0.8), -4)]
    for i, (loc, size, tilt) in enumerate(tail):
        box(f"tail{i}", size, loc, steel if i % 2 == 0 else steel_light,
            rot=(math.radians(tilt), 0, 0), bevel=0.15)

    # legs
    for side in (-1, 1):
        x = side * 1.8
        box(f"thigh{side}", (2.0, 2.6, 4.0), (x, 0.6, 4.2), steel, rot=(math.radians(-8), 0, 0), bevel=0.25)
        box(f"shin{side}", (1.5, 1.7, 3.6), (x, 1.1, 1.9), steel_light, rot=(math.radians(6), 0, 0), bevel=0.2)
        box(f"foot{side}", (1.9, 3.2, 0.9), (x, 0.2, 0.45), steel, bevel=0.12)
        for j in range(3):
            cyl(f"claw{side}{j}", 0.14, 0.9, (x - 0.5 + j * 0.5, -1.26, 0.35), steel_light,
                rot=(math.radians(78), 0, 0))
        cyl(f"piston{side}", 0.18, 2.6, (x + side * 0.9, 0.9, 2.6), rust, rot=(math.radians(18), 0, 0))
    # small arms
    for side in (-1, 1):
        box(f"arm{side}", (0.5, 0.5, 1.6), (side * 2.1, -3.2, 8.2), steel,
            rot=(math.radians(35), 0, 0), bevel=0.08)

    # floodlights aimed at the dinosaur
    for i, (x, y, rot) in enumerate([(-9, -9, 35), (9, -7, -35)]):
        cyl(f"fl_base{i}", 0.4, 1.6, (x, y, 0.8), steel_light)
        box(f"fl_head{i}", (1.1, 0.5, 0.9), (x, y, 1.8), steel, rot=(math.radians(rot), 0, 0))
        bpy.ops.object.light_add(type="SPOT", location=(x, y, 1.9))
        sp = bpy.context.object
        sp.data.energy = 4200
        sp.data.color = (1.0, 0.82, 0.58)
        sp.data.spot_size = math.radians(46)
        sp.data.spot_blend = 0.5
        d = Vector((0, -2.0, 8.0)) - Vector((x, y, 1.9))
        sp.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()

    bpy.ops.object.light_add(type="AREA", location=(-14, 14, 16))
    rim = bpy.context.object
    rim.data.energy = 2600
    rim.data.size = 10
    rim.data.color = (0.45, 0.62, 1.0)
    rim.rotation_euler = (math.radians(-52), 0, math.radians(-40))

    bpy.ops.object.light_add(type="AREA", location=(0, -6, 1.2))
    pool = bpy.context.object
    pool.data.energy = 420
    pool.data.size = 8
    pool.data.color = (1.0, 0.86, 0.68)
    pool.rotation_euler = (math.radians(88), 0, 0)

    # city: rings of buildings with glowing windows
    kinds = ["building-a", "building-b", "building-c", "building-d", "building-e",
             "building-f", "building-g", "building-h", "building-i", "building-k"]
    for ring, (radius, count, lo, hi) in enumerate([(160, 18, 16, 28), (250, 22, 26, 46), (350, 26, 40, 75)]):
        for i in range(count):
            ang = (i / count) * math.tau + random.uniform(-0.06, 0.06)
            r = radius + random.uniform(-12, 12)
            x, y = math.cos(ang) * r, math.sin(ang) * r
            if y < -30 and abs(x) < 30:
                continue
            s = random.uniform(lo, hi)
            building(random.choice(kinds), (x, y), s, rot_z=random.uniform(0, math.tau))
    # a couple of near towers for depth
    building("building-skyscraper-a", (-120, -95), 46, rot_z=0.3)
    building("building-skyscraper-c", (135, -80), 40, rot_z=-0.2)

    # sky + fog
    world = bpy.data.worlds["World"]
    world.use_nodes = True
    bg = world.node_tree.nodes["Background"]
    bg.inputs["Color"].default_value = (0.012, 0.016, 0.030, 1)
    bg.inputs["Strength"].default_value = 1.0

    bpy.ops.object.light_add(type="AREA", location=(-40, -60, 90))
    moon = bpy.context.object
    moon.data.energy = 420
    moon.data.size = 40
    moon.data.color = (0.55, 0.68, 1.0)
    moon.rotation_euler = (math.radians(55), 0, math.radians(-30))

    # camera: low angle, slow arc + tilt up
    bpy.ops.object.empty_add(location=(0, -2, 8.5))
    target = bpy.context.object
    bpy.ops.object.camera_add(location=(16, -26, 2.2))
    cam = bpy.context.object
    cam.data.lens = 32
    cam.data.sensor_width = 36
    con = cam.constraints.new("TRACK_TO")
    con.target = target
    con.track_axis = "TRACK_NEGATIVE_Z"
    con.up_axis = "UP_Y"
    scene.camera = cam

    def key(ob, path, frame, value):
        setattr(ob, path, value)
        ob.keyframe_insert(path, frame=frame)

    key(cam, "location", 1, (20.0, -27.0, 2.4))
    key(cam, "location", FRAMES, (9.0, -23.0, 3.1))
    key(target, "location", 1, (0.0, -2.0, 8.2))
    key(target, "location", FRAMES, (0.0, -2.0, 9.0))

    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = SAMPLES
    scene.cycles.use_denoising = True
    scene.cycles.max_bounces = 3
    scene.cycles.diffuse_bounces = 2
    scene.cycles.glossy_bounces = 2
    scene.cycles.use_fast_gi = True
    scene.render.resolution_x, scene.render.resolution_y = RES
    scene.render.resolution_percentage = 100
    scene.render.fps = FPS
    scene.frame_start, scene.frame_end = 1, FRAMES
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Medium High Contrast"
    scene.view_settings.exposure = 0.1
    scene.render.image_settings.file_format = "PNG"
    scene.render.filepath = os.path.join(OUT, "f_")
    os.makedirs(OUT, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, "mecha_dino.blend"))
    return scene


def main():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    scene = build()
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
