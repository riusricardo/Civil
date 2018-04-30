import * as React from "react";
import styled from "styled-components";

import ListingHistory from "./ListingHistory";
import ListingDetail from "./ListingDetail";
import { isInApplicationPhase, ListingWrapper } from "@joincivil/core";
import { getTCR } from "../../helpers/civilInstance";
import CountdownTimer from "../utility/CountdownTimer";

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%
  color: black;
`;

export interface ListingPageProps {
  match: any;
}

export interface ListingPageState {
  listing: ListingWrapper | undefined;
  secondsRemaining: number;
}

class ListingPage extends React.Component<ListingPageProps, ListingPageState> {
  constructor(props: ListingPageProps) {
    super(props);
    this.state = {
      listing: undefined,
      secondsRemaining: 0,
    };
  }

  public async componentDidMount(): Promise<void> {
    return this.initListing();
  }

  public render(): JSX.Element {
    const listing = this.state.listing;
    let appExists = false;
    let isInApplication = false;
    if (listing) {
      appExists = !listing.data.appExpiry.isZero();
      isInApplication = isInApplicationPhase(listing!.data);
    }
    return (
      <StyledDiv>
        {isInApplication && this.renderApplicationPhase()}
        {appExists && <ListingDetail listing={this.state.listing!} />}
        {!appExists && this.renderListingNotFound()}
        <ListingHistory match={this.props.match} />
      </StyledDiv>
    );
  }

  private renderApplicationPhase(): JSX.Element {
    return (
      <>
        APPLICATION IN PROGRESS. ends in... <CountdownTimer endTime={this.state.listing!.data.appExpiry.toNumber()} />
      </>
    );
  }

  private renderListingNotFound(): JSX.Element {
    return <>NOT FOUND</>;
  }

  // TODO(nickreynolds): move this all into redux
  private initListing = async () => {
    const tcr = getTCR();

    if (tcr) {
      const listingHelper = tcr.getListing(this.props.match.params.listing);
      const listing = await listingHelper.getListingWrapper();
      this.setState({ listing });
    }
  };
}

export default ListingPage;