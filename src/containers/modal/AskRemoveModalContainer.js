import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as postActions from 'store/modules/post';
import AskRemoveModal from 'components/modal/AskRemoveModal';
import { withRouter } from 'react-router-dom';

class AskRemoveModalContainer extends Component {
  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('remove');
  }

  handleConfirm = async () => {
    const { BaseActions, PostActions, history, match } = this.props;
    const { id } = match.params;

    try {
      //포스트 삭제 후 모달 닫고 웹사이트로 이동
      await PostActions.removePost(id);
      BaseActions.hideModal('remove');
      history.push('/');
    } catch(e) {
      console.log(e);
    }
  }


  render() {
    const { visible } = this.props;
    const { handleCancel, handleConfirm } = this;
    console.log("컨테이너/모달/에스크리무브모달컨테이너의 프롭스: ",this.props);
    return (
      <AskRemoveModal visible={visible} onCancel={handleCancel} onConfirm={handleConfirm}/>
    );
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'remove'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(withRouter(AskRemoveModalContainer));