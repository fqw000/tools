#  使用pac文件来避免手动切换ios端的网络代理
#  逻辑是先使用第一个代理，不能连通再使用第二个代理，还不能连通就直连
function FindProxyForURL(url, host){
 # url = url.tolowerCase () ;
 # host = host.toLowerCase();
  return "DIRECT; PROXY 192.168.1.119:6152; PROXY 192.168.1.118:6152";
}
