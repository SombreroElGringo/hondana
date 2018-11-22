import React, { Component } from 'react';
import './HomePage.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchStations } from '../../redux/actions/app';
import getStations from '../../redux/selectors/app/getStations';
import SearchStation from '../../components/SearchStation/SearchStation';
import StationsList from '../../components/StationsList/StationsList';

class HomePage extends Component {
  render() {
    const { stations, fetchStations } = this.props;

    return (
      <div className={'container'} id={'homepage'}>
        <SearchStation fetchStations={fetchStations} stations={stations} />
        <StationsList stations={stations} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stations: getStations(state),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStations,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
