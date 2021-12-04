import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// 以下の1行を追加する
import NavigationLinks from '~/components/organisms/NavigationLinks';
import Typography from '~/components/atoms/Typography';

const Root = styled.div`
  width: 100%;
  // 追加する
  display: flex;
`;

// 追加する
const StyledNavigationLinks = styled(NavigationLinks)`
  margin-left: auto;
`;

const Header = ({ className }) => (
  <Root className={className}>
    {/* 修正する。タイトルを左寄せにする */}
    <Typography size="title" color="red" align="left">
      YouTube Viewer
    </Typography>
    {/* 追加する */}
    <StyledNavigationLinks />
  </Root>
);

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

export default Header;