import urllib.request, socket, sys, os, ssl, time

OUT = r"D:\作业\我写的小说\rpgmaker解说\_probe.txt"
lines = []

# 1. read registry proxy
try:
    import winreg
    k = winreg.OpenKey(winreg.HKEY_CURRENT_USER,
                       r"Software\Microsoft\Windows\CurrentVersion\Internet Settings")
    enable, _ = winreg.QueryValueEx(k, "ProxyEnable")
    server, _ = winreg.QueryValueEx(k, "ProxyServer")
    lines.append(f"REG ProxyEnable={enable} ProxyServer={server}")
except Exception as e:
    lines.append(f"REG ERR {e}")

# 2. scan ports
for port in [7890, 7891, 7897, 1080, 10809, 8080]:
    s = socket.socket()
    s.settimeout(0.8)
    try:
        s.connect(("127.0.0.1", port))
        lines.append(f"PORT {port} OPEN")
    except Exception:
        lines.append(f"PORT {port} closed")
    finally:
        s.close()

# 3. test fetch through proxy
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0 Safari/537.36")
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

targets = [
    "https://en.wikipedia.org/wiki/ASCII_Corporation",
    "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%82%B9%E3%82%AD%E3%83%BC_(%E4%BC%81%E6%A5%AD)",
    "https://web.archive.org/web/2000/http://www.ascii.co.jp/",
    "https://www.pcgamer.com/the-secret-history-of-underdog-game-engine-rpg-maker-and-how-it-got-its-bad-reputation/",
]

for proxy in ["http://127.0.0.1:7890", "http://127.0.0.1:7897"]:
    opener = urllib.request.build_opener(
        urllib.request.ProxyHandler({"http": proxy, "https": proxy}),
        urllib.request.HTTPSHandler(context=ctx))
    opener.addheaders = [("User-Agent", UA), ("Accept-Encoding", "identity")]
    for url in targets:
        t0 = time.time()
        try:
            r = opener.open(url, timeout=25)
            data = r.read(3000)
            lines.append(f"OK   [{proxy}] {url} status={r.status} bytes={len(data)} t={time.time()-t0:.1f}s")
        except Exception as e:
            lines.append(f"FAIL [{proxy}] {url} ==> {type(e).__name__}: {str(e)[:160]}")

with open(OUT, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))
print("done")
