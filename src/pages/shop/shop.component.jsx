import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { firestore, covertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import CollectionPage from "../collection/collection.component";
import { updateCollections } from "../../redux/shop/shop.actions";

const ShopPage = ({ match, updateCollections }) => {
  // unsubscribeFromSnapshot = null;

  useEffect(
    () => {
      const collectionRef = firestore.collection("collections");

      collectionRef.onSnapshot(async snapshot => {
        const collectionsMap = covertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
      });

      return () => {};
    },
    [updateCollections]
  );

  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
