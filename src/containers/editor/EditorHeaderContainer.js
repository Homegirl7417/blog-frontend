import React, { Component } from 'react';
import EditorHeader from 'components/editor/EditorHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import * as editorActions from 'store/modules/editor';

class EditorHeaderContainer extends Component {
    componentDidMount() {
        const { EditorActions, location } = this.props;
        EditorActions.initialize(); //에디터 초기화

        //쿼리 파싱
        const { id } = queryString.parse(location.search);
        if(id) {
            //id가 존재한다면 포스트 불러오기
            EditorActions.getPost(id);
        }
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.goBack();
    }

    handleSubmit = async () => {
        const { title, markdown, tags, EditorActions, history, location } = this.props;
        const post = {
            title,
            body: markdown,
            //태그를 ,로 분리 && trim()을 이용해 앞과 뒤의 공백 제거
            tags: tags === "" ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
        }
        try {
            //id가 존재하면 editPost 호출
            const { id } = queryString.parse(location.search);
            if(id) {
                await EditorActions.editPost({id, ...post});
                history.push(`/post/${id}`);
                return;
            }
            await EditorActions.writePost(post);
            //history를 통한 페이지 이동. 
            history.push(`/post/${this.props.postId}`);
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const { handleGoBack, handleSubmit } = this;
        const { id } = queryString.parse(this.props.location.search);
        return (
            <EditorHeader
                onGoBack={handleGoBack}
                onSubmit={handleSubmit}
                isEdit={id ? true : false}
            />
        );
    }
}

export default connect(
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown'),
        tags: state.editor.get('tags'),
        postId: state.editor.get('postId')
    }),
    (dispatch) => ({
        EditorActions: bindActionCreators(editorActions, dispatch)
    })
)(withRouter(EditorHeaderContainer));