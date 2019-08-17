import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import { newHit } from '../../redux/modules/hits';

// eslint-disable-next-line no-shadow
const Hits = ({ newHit, hits }) => (
  <div className="ml-2 flex flex-row items-center">
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      type="button"
      onClick={newHit}
    >
      Hit
    </button>
    <p className="ml-2">{`${hits} hits babyyy`}</p>
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
