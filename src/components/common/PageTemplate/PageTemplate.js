import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer'

//classNames 는 CSS 클래스를 조건부로 설정 할 때, 여러 클래스를 적용할 때 유용
const cx = classNames.bind(styles);

const PageTemplate = ({children}) => (
    <div className={cx('page-template')}>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </div>
);

export default PageTemplate;