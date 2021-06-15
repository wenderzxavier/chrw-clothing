import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, isCollectionFetching, fetchCollectionsStartAsync }) => {
  useEffect(
    () => {
      fetchCollectionsStartAsync();
    },
    [fetchCollectionsStartAsync]
  );

  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} render={props => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} />
      <Route path={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
