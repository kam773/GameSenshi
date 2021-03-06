import React, { useState, useCallback, useRef } from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import Image from 'material-ui-image'
import { ColStyledSound, DivStyledHover, TextStyledYellow } from './styled'
import { Exports } from 'component_b_Atoms'
import { stopUndefined } from 'utils'

const {
	ButtonSoundStoreSoundPropedCardUser,
	BadgesOptioned,
	Link,
} = stopUndefined(Exports)

const CardUser = props => {
	const [hover, setHover] = useState(false)
	const [leave, setLeave] = useState(false)
	const timeId = useRef(0)
	const { name, src, badge, gender, audioSrc, price, description } = props

	const setHoverTrue = useCallback(() => {
		clearTimeout(timeId.current)
		setHover(true)
		setLeave(false)
	}, [])

	const setHoverFalse = useCallback(() => {
		setLeave(true)
		timeId.current = setTimeout(() => {
			setHover(false)
			setLeave(false)
		}, 500)
	}, [])

	return (
		<Col
			xs='6'
			lg='3'
			className='p-2'
			onMouseEnter={setHoverTrue}
			onMouseLeave={setHoverFalse}
			onMouseMove={setHoverTrue}
		>
			<Link
				baseClass='w-100'
				to='#pablo'
				target='_blank'
				rel='noopener noreferrer'
				className='w-100'
			>
				<Card className='card-profile bg-blue-gradient mt-0'>
					<DivStyledHover
						styledHover={hover}
						styledLeave={leave}
						className={classnames('card-image')}
					>
						<Row className='w-100 position-absolute mt-3' style={{ zIndex: 2 }}>
							<Col className='px-0' align='right'>
								<BadgesOptioned badges={badge} className='m-0' />
							</Col>
						</Row>
						<div className='px-2 pt-2'>
							<Image
								alt={name}
								className='img img-raised rounded-lg'
								color='transparent' //this is needed or else there is tiny white background even when OTHER image in carousel move, very weird behavior
								src={src}
							/>
						</div>
					</DivStyledHover>
					<CardBody>
						<Row className='align-items-center'>
							<Col align='left'>
								<h4
									className={classnames(
										'title my-0 font-weight-bold text-nowrap text-white'
									)}
									align='left'
								>
									{name}
								</h4>
							</Col>
						</Row>
						<Row className='align-items-center my-1'>
							<ColStyledSound
								xs='8'
								className={classnames('pr-0')}
								align='left'
							>
								<ButtonSoundStoreSoundPropedCardUser
									gender={gender}
									url={audioSrc}
								/>
							</ColStyledSound>
							<Col className='pl-0'>
								<TextStyledYellow
									align='right'
									className={classnames('title my-0 text-white text-nowrap')}
								>
									${price}/h
								</TextStyledYellow>
							</Col>
						</Row>
						<Row>
							<Col>
								<p align='left' className='text-white m-0 text-nowrap'>
									{description}
								</p>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Link>
		</Col>
	)
}

export { CardUser }
