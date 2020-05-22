import React from 'react'
import loading from './loading.svg'

export default React.memo(() => {
	return (
		<div className="lh-loading">
			<img src={loading} alt="" />
			<div>2000 years later ...</div>
		</div>
	)
})