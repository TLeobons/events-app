import { useState } from "react"
import { Form, Container, Col, Row, Button } from "react-bootstrap"
import { useMutation, gql } from "@apollo/client"
import DatePicker from "react-datepicker"
import { useHistory } from "react-router-dom"
import nextId from "react-id-generator"

import "react-datepicker/dist/react-datepicker.css"
import { addDays, addEventToLocalStorage, getLocalStorage } from "../utils"

const addEventQuery = gql`
  mutation addEvent($data: EventInput!) {
    createEvent(data: $data) {
      name
      startDate
      endDate
    }
  }
`
export const AddEvent = () => {
  const history = useHistory()
  const [eventName, setEventName] = useState("")
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1))
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [updateTodo] = useMutation(addEventQuery, {
    onCompleted: async data => {
      const prevEventLength = getLocalStorage()
      const newEvent = {
        id: nextId(
          `random-id-${prevEventLength ? prevEventLength.length : "000"}`
        ),
        name: eventName,
        startDate: startDate,
        endDate: endDate,
      }
      addEventToLocalStorage(newEvent)
      history.push("/", newEvent)
    },
  })
  return (
    <Container
      style={{
        border: "2px solid black",
      }}
    >
      <Form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Form.Group
          as={Row}
          controlId="formPlaintextPassword"
          className="w-100 mt-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col sm="2">
            <Form.Label column>Event Name:</Form.Label>
          </Col>
          <Col sm="4">
            <Form.Control
              type="text"
              onChange={(e) => {
                let value = e.target.value
                setEventName(value)
              }}
              placeholder="Event Name"
            />

          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          controlId="formPlaintextPassword"
          className="w-100 mt-1"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col sm="2">
            <Form.Label column>Start Date:</Form.Label>
          </Col>
          <Col sm="4">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date: Date) => {
                setStartDate(date)
                setEndDate(addDays(date, 1))
              }}
              className="form-control"
              wrapperClassName="col-12"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          controlId="formPlaintextPassword"
          className="w-100 mt-1"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col sm="2">
            <Form.Label column>End Date:</Form.Label>
          </Col>
          <Col sm="4">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              minDate={addDays(startDate, 1)}
              className="form-control"
              placeholderText="Enter End Date"
              wrapperClassName="col-12"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          controlId="formPlaintextPassword"
          className="w-50 mt-1"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant="secondary"
            onClick={() => {
              const data = {
                name: eventName,
                startDate: startDate,
                endDate: endDate,
              }
              updateTodo({ variables: { data: data } })
            }}
          >
            Create Event
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}
