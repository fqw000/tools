import os
import requests
import yaml

# Get the SHA of the latest commit
commit_sha = os.environ["GITHUB_SHA"]

# Get the URL of the repository dispatch event
dispatch_url = f"https://api.github.com/repos/{os.environ['GITHUB_REPOSITORY']}/dispatches"

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
    v2ray_file.write(v2抱歉，似乎我的回答中有重复的部分。以下是完整的修改后的 Python 代码，用于在 `sub` 文件更新时触发该 GitHub Action 工作流程：

```python
import os
import requests
import yaml

# Get the SHA of the latest commit
commit_sha = os.environ["GITHUB_SHA"]

# Get the URL of the repository dispatch event
dispatch_url = f"https://api.github.com/repos/{os.environ['GITHUB_REPOSITORY']}/dispatches"

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
with open("kuainingmeng/xray.list", "import os
import requests
import yaml

# Get the SHA of the latest commit
commit_sha = os.environ["GITHUB_SHA"]

# Get the URL of the repository dispatch event
dispatch_url = f"https://api.github.com/repos/{os.environ['GITHUB_REPOSITORY']}/dispatches"

# Check if the 'sub' file has been updated
response = requests.get("https://raw.githubusercontent.com/fqw000/tools/main/kuainingmeng/sub")
if response.status_code == 200 and response.headers.get("ETag") != os.environ.get("ETag"):
    # Store the new ETag value
    os.environ["ETag"] = response.headers.get("ETag")

    # Create a JSON payload for the repository dispatch event
    payload = {
        "event_type": "update_subscriptions",
        "client_payload": {"commit_sha": commit_sha}
    }

    # Send a repository dispatch event to trigger the workflow
    headers = {
        "Accept": "application/vnd.github.everest-preview+json",
        "Authorization": f"Bearer {os.environ['GITHUB_TOKEN']}"
    }
    response = requests.post(dispatch_url, headers=headers, json=payload)
    response.raise_for_status()

    print("GitHub Action triggered successfully.")
else:
    print("No updates detected in 'sub' file.")
