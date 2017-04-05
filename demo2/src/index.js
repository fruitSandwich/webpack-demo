import sub from './sub'

var app = document.createElement('div')
app.innerHTML = '<h1>hello</h1>'

app.appendChild(sub());

document.body.appendChild(app);