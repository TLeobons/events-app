import { useEffect, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { gql } from "@apollo/client"
import { formatDate, getLocalStorage } from "../utils"

type Props = {
  location?: Object
  id?: string
}

const queryGetEventById = gql`
  query getEventById($id: String!) {
    event(id: $id) {
      name
      startDate
      endDate
      subscribedUsers {
        username
        id
      }
    }
  }
`
type Event = {
  name?: string
  startDate?: string
  endDate?: string
}
type SubscribedUsers = {
  username: string
  id: string
}

export const ShowEvent: React.FC<Props> = props => {

  const { state } = useLocation()
  const [eventDetail, setEventDetail] = useState<Event>()
  const [subscribedUsers, setSubscribeUsers] = useState<SubscribedUsers[]>()
  const { loading, data, error } = useQuery(queryGetEventById, {
    variables: {
      id: state,
    },
  })

  useEffect(() => {
    if (state && state.includes("random-id")) {
      const getAllEvents = getLocalStorage()
      if (getAllEvents) {
        const finalResult = getAllEvents.find(
          ({ id }: { id: string }) => id === state
        )
        if (finalResult) setEventDetail(finalResult)
      }
    } else {
      if (data && data.event) {
        setEventDetail(data.event)
        setSubscribeUsers(data.event.subscribedUsers)
      }
    }
    return () => {}
  }, [data, state])
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  console.log("eventDetail", eventDetail)
  return (
    <Container>
      <Row className="mb-2">
        <h3>Event Details</h3>
      </Row>
      <Row style={{ border: "1px solid black", maxWidth: "500px" }}>
        <Col sm={6} md={6} lg={6}>
          <b>Event Name</b>
        </Col>
        <Col sm={6}>{eventDetail && eventDetail?.name}</Col>
        <Col className="mt-2" sm={6} md={6} lg={6}>
          <b>Start Date</b>
        </Col>
        <Col sm={6}>{eventDetail && formatDate(eventDetail?.startDate)}</Col>
        <Col className="mt-2" sm={6} md={6} lg={6}>
          <b>End Date</b>
        </Col>
        <Col sm={6}>{eventDetail && formatDate(eventDetail?.endDate)}</Col>
      </Row>

      <Row className="mt-5 mb-2">
        <h3>Attendees</h3>
      </Row>
      <Row
        style={{
          border: "1px solid black",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        {subscribedUsers && subscribedUsers.length > 0 ? (
          subscribedUsers.map(({username}, key) => {
            return (
              <Col
                key={key}
                style={{ borderBottom: "1px solid black" }}
                sm={12}
              >
                {username}
              </Col>
            )
          })
        ) : (
          <div>No attendee found</div>
        )}
      </Row>
      <Row className="mt-4">
        <Link to="/">
          <Button variant="secondary">Back To List</Button>
        </Link>
      </Row>
    </Container>
  )
}
