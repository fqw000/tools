var body = $response.body;
var data = JSON.parse(body);
data.list = data.list.filter(function(item) {
  return item.type !== 3;
});
$done({body: JSON.stringify(data)});
