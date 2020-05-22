import React, {useState, useCallback} from 'react'
import reactDOM from 'react-dom'
import ReportViewer from 'react-lighthouse-viewer'
import './style.css'
import Input from './components/Input'
import PageLoading from './components/PageLoading'
// import jsonReport from './report.json'

const App = () => {
	const [loading, setLoading] = useState(false)
	const [json, setJson] = useState()
	const [error, setError] = useState('')

	const handleFetch = useCallback((url) => {
		if (loading) return

		setLoading(true)
		setError('')

		fetch('/api/report?url=' + url)
			.then(res => {
				if (!res.ok) {
					return res.text()
				}
				return res.json()
			})
			.then(res => {
				typeof res === 'string'
				? setError(res)
				: setJson(res)
			})
			.catch(err => {
				setError(`${err}`)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [loading, setLoading, setJson])

	return (
		<div>
			<Input onSubmit={handleFetch} loading={loading} />
			{
				json
				? <ReportViewer json={json} />
				: loading ? <PageLoading /> : null
			}

			{
				error && <div className="lh-error">{error}</div>
			}
		</div>
	)
}

reactDOM.render(
	<App />
	,document.getElementById('root')
)