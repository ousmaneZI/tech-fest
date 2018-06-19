const express = require('express')
//const fs = require("fs")
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.use(express.static('bower_components'))
app.use(express.static('bower_components/tracking'))
app.use(express.static('bower_components/tracking/examples'))


app.get('/', (req, res) => res.send(`
<h3>Go to trackingjs!</h3>
<h5><a href='/brief.html'>brief.html</a></h5>
<h5><a href='/brief_camera.html'>brief_camera.html</a></h5>
<h5><a href='/color_camera.html'>color_camera.html</a></h5>
<h5><a href='/color_draw_something.html'>color_draw_something.html</a></h5>
<h5><a href='/color_fish_tank.html'>color_fish_tank.html</a></h5>
<h5><a href='/color_hello_world.html'>color_hello_world.html</a></h5>
<h5><a href='/color_video.html'>color_video.html</a></h5>
<h5><a href='/face_camera.html'>face_camera.html</a></h5>
<h5><a href='/face_fish_tank.html'>face_fish_tank.html</a></h5>
<h5><a href='/face_hello_world.html'>face_hello_world.html</a></h5>
<h5><a href='/face_tag_friends.html'>face_tag_friends.html</a></h5>
<h5><a href='/fast.html'>fast.html</a></h5>
<h5><a href='/fast_camera.html'>fast_camera.html</a></h5>
<h5><a href='/test.html'>test.html</a></h5>`))

// route requests
app.get('/getData', function (req, res) {
  console.log('getData request')
  res.setHeader('Content-Type', 'application/json');
  //res.send(JSON.stringify(<an object>));
  res.send(JSON.stringify({ status: 'SUCCESS', data: null }));
})
app.post('/postData', function (req, res) {
  console.log('postData request')
  console.log(req.body)
  res.setHeader('Content-Type', 'application/json');
  //res.send(JSON.stringify(<an object>));
  res.send(JSON.stringify({ status: 'SUCCESS', statusText: 'postData is processed.', data: null }))
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))

