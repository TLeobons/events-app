import { useEffect, useState } from "react";
import { Button, Row, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useLocation } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { formatDate, getLocalStorage } from "../utils";
import { BrowserHistory } from "history";
const getAllEvents = gql`
  query {
    events {
      id
      name
      startDate
      endDate
      subscribedUsers {
        username
      }
    }
  }
`;
type Event = {
  createdAt?: string;
  createdByUser?: string;
  endDate: string;
  id?: string;
  name: string;
  startDate: string;
  subscribedUsers?: string;
};
type Props = {
  history: BrowserHistory;
};

export const Events = (props: Props) => {
  const { state }: { state: Event } = useLocation();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const { loading, error, data } = useQuery(getAllEvents);
  useEffect(() => {
    console.log("STATE");
  }, [state]);
  useEffect(() => {
    if (data && data.events) {
      let prevEvents: Event[] = [];
      let getStorageEvents = getLocalStorage();
      if (getStorageEvents) {
        prevEvents = [...getStorageEvents, ...allEvents, ...data.events];
      } else {
        prevEvents = [...allEvents, ...data.events];
      }
      setAllEvents(prevEvents);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <Container>
      <Row
        className="mb-2"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Link to="/add">
          <Button variant="secondary">Create New Event</Button>
        </Link>
      </Row>
      <Row>
        <Table bordered>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Attendees</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allEvents.length > 0 &&
              allEvents.map(
                ({ name, startDate, endDate, subscribedUsers, id }, key) => {
                  return (
                    <tr key={key}>
                      <td>{name}</td>
                      <td>{formatDate(startDate)}</td>
                      <td>{formatDate(endDate)}</td>
                      <td>{subscribedUsers ? subscribedUsers.length : 0}</td>
                      <td>
                        <Link
                          to={{
                            pathname: "/show",
                            state: id,
                          }}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
