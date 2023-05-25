import yaml

# 读取YAML文件
with open('lemon.yaml', 'r') as f:
    data = yaml.safe_load(f)

# 提取节点信息
nodes = []
for node in data:
    nodes.append({
        'server': node['server'],
        'port': node['port'],
        'type': node['type'],
        'password': node['password'],
        'sni': node['sni'],
        'skip-cert-verify': node['skip-cert-verify'],
        'udp': node['udp']
    })

# 将节点信息保存到文件
with open('lemon-node.yaml', 'w') as f:
    yaml.safe_dump(nodes, f)
