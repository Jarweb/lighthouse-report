const Koa = require('koa')
const Router = require('@koa/router')
const views = require('koa-views')
const serve = require('koa-static')
const path = require('path')
const lighthouse = require('lighthouse')

const app = new Koa()
const router = new Router()

const host = 3034

app.use(serve(path.join(__dirname, '../dist')))
app.use(views(path.join(__dirname, '../dist')))

router.get('/', async (ctx) => {
	await ctx.render('index.html')
})

router.get('/api/report', async (ctx) => {
	const url = ctx.query.url
	const flags = {
		output: 'json',
		logLevel: 'error',
		chromeFlags: [
			'--headless',
			"--disable-gpu",
			"--no-sandbox",
			"--quit"
		]
	}
	// todo: custom config
	const config = {
		extends: "lighthouse:default"
	}
	try {
		const result = await lighthouse(url, flags, config)
		ctx.type = 'application/json; charset=utf-8'
		ctx.body = result.lhr
	}
	catch (err) {
		ctx.status = 400
		ctx.type = 'text/plain; charset=utf-8'
		ctx.body = err.friendlyMessage || err.code || `${err}`
	}
})

app.use(router.routes())
app.listen(host, () => {
	console.log('start on host: ', host)
})