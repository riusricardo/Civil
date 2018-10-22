import * as React from "react";
import { DispatchProp } from "react-redux";
import { Query } from "react-apollo";
import {
  LISTING_QUERY,
  transformGraphQLDataIntoNewsroom,
  transformGraphQLDataIntoListing,
} from "../../helpers/queryTransformations";
import ListingListItem from "./ListingListItem";

export interface ListingListItemApolloContainerOwnProps {
  listingAddress: string;
  even: boolean;
  ListingItemComponent?: any;
}

export default class ListingListItemApolloContainerComponent extends React.Component<
  ListingListItemApolloContainerOwnProps & DispatchProp<any>
> {
  public render(): JSX.Element {
    const listingAddress = this.props.listingAddress;
    return (
      <Query query={LISTING_QUERY} variables={{ addr: listingAddress }}>
        {({ loading, error, data }: any): JSX.Element => {
          if (loading) {
            return <></>;
          }
          if (error) {
            return <p>Error :{error}</p>;
          }
          const newsroom = transformGraphQLDataIntoNewsroom(data, this.props.listingAddress);
          const listing = transformGraphQLDataIntoListing(data, this.props.listingAddress);
          return (
            <ListingListItem
              listingAddress={listingAddress}
              newsroom={newsroom}
              listing={listing}
              even={this.props.even}
              ListingItemComponent={this.props.ListingItemComponent}
              queryData={data}
            />
          );
        }}
      </Query>
    );
  }
}