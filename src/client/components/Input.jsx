import React, {useState, useCallback} from 'react'

const Input = React.memo((props) => {
	const { onSubmit, loading } = props
	const [text, setText] = useState('')
	const handle = useCallback((e) => {
		setText(e.target.value)
	})
	const handleSubmit = useCallback((e) => {
		e.preventDefault()
		onSubmit && onSubmit(text)
	}, [text, onSubmit])

	return (
		<div className="lh-search">
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="analayze your website" onChange={handle} autoComplete="true" />
			</form>
			<span className="lh-search-btn" onClick={handleSubmit}>{loading ? 'waiting...' : 'Analayze'}</span>
		</div>
	)
})

export default Input