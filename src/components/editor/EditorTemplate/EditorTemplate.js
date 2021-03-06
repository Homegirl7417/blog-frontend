import React, { Component } from 'react';
import styles from './EditorTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class EditorTemplate extends Component {
    state = {
        leftPercentage: 0.5
    }

    //separator 클릭 후 마우스를 움직이면 그에 따라 leftPerentage 업데이트
    handleMouseMove = (e) => {
        this.setState({
            leftPercentage: e.clientX / window.innerWidth
        });
    }

    handleMouseUp = (e) => {
        document.body.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    //separator 클릭할 때
    handleSeparatorMouseDown = (e) => {
        document.body.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    } 

    render() {
        const { header, editor, preview } = this.props;
        const { leftPercentage } = this.state;
        const { handleSeparatorMouseDown } = this;

        const leftStyle = {
            flex: leftPercentage
        };

        const rightStyel = {
            flex: 1 - leftPercentage
        };

        //separator 위치 설정
        const separatorStyle = {
            left: `${leftPercentage * 100}%`
        }

        return (
            <div className={cx('editor-template')}>
                {header}
                <div className={cx('panes')}>
                    <div className={cx('pane','editor')}>
                        {editor}
                    </div>
                    <div className={cx('pane','preview')}>
                        {preview}
                    </div>
                    <div
                        className={cx('separator')}
                        style={separatorStyle}
                        onMouseDown={handleSeparatorMouseDown} />
                </div>
            </div>
        );
    }
}

export default EditorTemplate;