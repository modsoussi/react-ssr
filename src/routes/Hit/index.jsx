import React from 'react';
import { connect } from 'react-redux';
import { newHit } from '../../redux/modules/hits';
import { bindActionCreators } from 'redux';
class Hits extends React.Component {
  render() {
    return (
      <div>
        <button className="" onClick={this.props.newHit}>Hit</button>
        <p>{`${this.props.hits} hits`}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hits: state.hits.hits,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ newHit }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Hits);
