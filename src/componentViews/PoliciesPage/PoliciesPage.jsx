import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { stopUndefined } from 'utils'
import { Privacy } from './Privacy'
import { Cookie } from './Cookie'
import { Terms } from './Terms'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Route, Switch } from 'react-router-dom'
import {
	ROUTE_PAGE_POLICY_COOKIES,
	ROUTE_PAGE_POLICY_TERMS,
	ROUTE_PAGE_POLICY_PRIVACY,
} from 'routes'
import {
	TabContent,
	TabPane,
	Container,
	Row,
	Col,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap'
import { Exports } from 'componentpMultiOrganisms'

const { Footer, Link } = stopUndefined(Exports)

const NAME = 'name'
const ICON = 'icon'
const POLICY = 'policy'
const TO = 'to'
const PRIVACY = 'Privacy Policy'
const COOKIE = 'Cookie Policy'
const TERM = 'Terms And Conditions'

const policies = [
	{
		[NAME]: PRIVACY,
		[ICON]: 'tim-icons icon-lock-circle',
		[POLICY]: Privacy,
		[TO]: ROUTE_PAGE_POLICY_PRIVACY,
	},
	{
		[NAME]: COOKIE,
		[ICON]: 'fas fa-cookie-bite',
		[POLICY]: Cookie,
		[TO]: ROUTE_PAGE_POLICY_COOKIES,
	},
	{
		[NAME]: TERM,
		[ICON]: 'tim-icons icon-single-copy-04',
		[POLICY]: Terms,
		[TO]: ROUTE_PAGE_POLICY_TERMS,
	},
]
const PoliciesPage = props => {
	const [tab, setTabName] = useState(() => Privacy)

	useEffect(() => {
		document.body.classList.add('index-page')
		document.documentElement.scrollTop = 0
		document.scrollingElement.scrollTop = 0
		return () => {
			document.body.classList.remove('index-page')
		}
	}, [])
	const {
		location: { pathname },
	} = props
	return (
		<>
			<Container className='mt-5 mb-5'>
				<Row style={{ height: 120 }}></Row>
				<Row>
					<Col lg='2' md='3'>
						<Nav
							className='nav-pills-primary nav-pills-icons flex-column'
							pills
							role='tablist'>
							<NavItem>
								{policies.map(policy => {
									const { [NAME]: name, [ICON]: icon, [TO]: to } = policy
									return (
										<NavLink
											key={name}
											name={name}
											className={classnames({
												active: pathname.toLowerCase() === to.toLowerCase(),
											})}
											tag={Link}
											to={to}>
											<i style={{ fontSize: '40px' }} className={icon} />
											{name}
										</NavLink>
									)
								})}
							</NavItem>
						</Nav>
					</Col>
					<Col lg='9' md='8'>
						<TabContent activeTab='123' className='mb-5'>
							<TabPane tabId='123'>
								<PerfectScrollbar className='pr-3' style={{ height: 768 }}>
									<Switch>
										{policies.map(policy => {
											const {
												[NAME]: name,
												[POLICY]: Policy,
												[TO]: to,
											} = policy
											return (
												<Route
													key={name}
													path={to}
													render={prop => <Policy {...prop} />}
												/>
											)
										})}
									</Switch>
								</PerfectScrollbar>
							</TabPane>
						</TabContent>
					</Col>
				</Row>
			</Container>
			<Footer />
		</>
	)
}
export { PoliciesPage }
