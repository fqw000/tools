import requests
import base64
import json
import sys

def convert_sub(sub_url, sub_type):
    # Download subscription content
    r = requests.get(sub_url)
    content = base64.b64decode(r.text).decode('utf-8')

    # Extract nodes
    nodes = content.splitlines()

    # Convert to Loon format
    if sub_type == 'loon':
        loon_nodes = []
        for node in nodes:
            loon_node = {
                'name': node.split(' ')[-1],
                'type': 'ss',
                'server': node.split(' ')[0],
                'port': node.split(' ')[1],
                'cipher': 'chacha20-ietf-poly1305',
                'password': node.split(' ')[2],
                'udp': True,
                'network': 'tcp'
            }
            loon_nodes.append(loon_node)
        loon_sub = {
            'title': 'Converted from subscription',
            'version': '1.0',
            'type': 'Advanced',
            'proxies': loon_nodes
        }
        with open('kuainingmeng/loon.list', 'w') as f:
            f.write(json.dumps(loon_sub, indent=2))
    
    # Convert to Clash format
    elif sub_type == 'clash':
        clash_nodes = []
        for node in nodes:
            clash_node = {
                'name': node.split(' ')[-1],
                'type': 'ss',
                'server': node.split(' ')[0],
                'port': node.split(' ')[1],
                'cipher': 'chacha20-ietf-poly1305',
                'password': node.split(' ')[2],
                'udp': True
            }
            clash_nodes.append(clash_node)
        clash_sub = {
            'proxies': clash_nodes
        }
        with open('kuainingmeng/clash.yaml', 'w') as f:
            f.write('proxies:\n')
            for node in clash_nodes:
                f.write(f"  - {json.dumps(node)}\n")
    
    # Convert to V2rayNG format
    elif sub_type == 'v2rayng':
        v2rayng_nodes = []
        for node in nodes:
            v2rayng_node = {
                'ps': node.split(' ')[-1],
                'add': node.split(' ')[0],
                'port': node.split(' ')[1],
                'id': node.split(' ')[2],
                'aid': '2',
                'net': 'tcp',
                'type': 'none',
                'host': '',
                'tls': ''
            }
            v2rayng_nodes.append(v2rayng_node)
        v2rayng_sub = {
            'v': '2',
            'ps': 'Converted from subscription',
            'add': '',
            'port': '',
            'id': '',
            'aid': '',
            'net': '',
            'type': '',
            'host': '',
            'path': '',
            'tls': '',
            'sni': '',
            'group': '',
            'remarks': '',
            'obfs': '',
            'obfsparam': '',
            'udp': '',
            'vnext': v2rayng_nodes
        }
        with open('kuainingmeng/xray.list', 'w') as f:
            for node in v2rayng_nodes:
                f.write(f"{node['ps']}=vmess,{node['add']},{node['port']},chacha20-ietf-poly1305,{node['id']},group=Converted from subscription\n")

if __name__ == '__main__':
    sub_url = os.environ['SUB_URL']
    sub_type = sys.argv[1]
    convert_sub(sub_url, sub_type)
