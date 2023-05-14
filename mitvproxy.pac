function FindProxyForURL(url, host) {
  // 判断是否连接到局域网
  if (isPlainHostName(host) || shExpMatch(host, "*.local") || isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") || isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") || isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0")) {
    // 连接到局域网，直接连接
    return "DIRECT";
  }
  // 国内流量走本地代理服务器
  if (isInNet(dnsResolve(host), "0.0.0.0", "127.255.255.255") || isInNet(dnsResolve(host), "10.0.0.0", "10.255.255.255") || isInNet(dnsResolve(host), "172.16.0.0", "172.31.255.255") || isInNet(dnsResolve(host), "192.168.0.0", "192.168.255.255") || isInNet(dnsResolve(host), "100.64.0.0", "100.127.255.255") || isInNet(dnsResolve(host), "121.0.0.0", "121.255.255.255") || isInNet(dnsResolve(host), "127.0.0.0", "127.255.255.255") || isInNet(dnsResolve(host), "169.254.0.0", "169.254.255.255") || isInNet(dnsResolve(host), "192.0.0.0", "192.0.2.255") || isInNet(dnsResolve(host), "192.88.99.0", "192.88.99.255") || isInNet(dnsResolve(host), "192.168.0.0", "192.168.255.255") || isInNet(dnsResolve(host), "198.18.0.0", "198.19.255.255") || isInNet(dnsResolve(host), "198.51.100.0", "198.51.100.255") || isInNet(dnsResolve(host), "203.0.113.0", "203.0.113.255") || isInNet(dnsResolve(host), "224.0.0.0", "239.255.255.255")) {
    // 国内流量，走本地代理服务器
    return "PROXY 127.0.0.1:1080";
  } else {
    // 国外流量，走海外代理服务器
    return "PROXY 192.168.242:7222";
  }
}
