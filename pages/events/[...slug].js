import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import { getFilteredEvents } from "../../helpers/api-util";
import ResultsTitle from "../../components/events/results-title";
import { Fragment } from "react";
import Button from "../../components/ui/button";

import ErrorAlert from "../../components/ui/error-alert/error-alert";

const FilteredEventsPage = ({ hasError, filteredEvents, date }) => {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center"> Loading...</p>;
  }

  if (filterData.length > 2) {
    router.replace("/");
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Enter valid filter values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen Filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const dateObj = new Date(date.year, date.month - 1);

  return (
    <div>
      <ResultsTitle date={dateObj} />
      <EventList items={filteredEvents} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return {
      props: {
        hasError: true,
      },
      /* notFound: true, */
      /* redirect: {
        destination: "/error"
      } */
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: { filteredEvents, date: { year: numYear, month: numMonth } },
  };
}

export default FilteredEventsPage;
