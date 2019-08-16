import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import { newHit } from '../../redux/modules/hits';

// eslint-disable-next-line no-shadow
const Hits = ({ newHit, hits }) => (
  <div>
    <button type="button" className="bw-1" onClick={newHit}>Hit</button>
    <p>{`${hits} hits`}</p>
  </div>
);

const mapStateToProps = (state) => ({
  hits: state.hits.hits,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ newHit }, dispatch);

Hits.propTypes = {
  hits: propTypes.number.isRequired,
  newHit: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Hits);
