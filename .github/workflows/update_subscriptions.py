import requests
import yaml

# Read the first 3 lines of the URL list
response = requests.get("https://raw.githubusercontent.com/fqw000/tools/main/kuainingmeng/sub")
url_lines = response.text.strip().split("\n")[:3]

# Process Loon subscription
loon_response = requests.get(url_lines[0])
with open("kuainingmeng/loon.list", "w") as loon_file:
    loon_file.write(loon_response.text)

# Process Clash subscription
clash_response = requests.get(url_lines[1])
clash_data = yaml.safe_load(clash_response.text)
with open("kuainingmeng/clash.yaml", "w") as clash_file:
    yaml.safe_dump(clash_data, clash_file)

# Process V2rayNG subscription
v2ray_response = requests.get(url_lines[2])
with open("kuainingmeng/xray.list", "w") as v2ray_file:
    v2ray_file.write(v2ray_response.text)
