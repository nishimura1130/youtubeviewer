import React from 'react';
import PropTypes from 'prop-types';

// 以下の1行を修正する
import styled, { css } from 'styled-components';　// { css } を追加する
import { useHistory } from 'react-router-dom';
import Image from '~/components/atoms/Image';

// 以下の1行を追加する
import FavoriteButton from '~/components/molecules/FavoriteButton';
import Typography from '~/components/atoms/Typography';

// 略

const Description = styled(Typography)`
  margin-top: 5px;
  height: fit-content;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  // 追加する
  ${({ requireMarginForButton }) => requireMarginForButton && (
    css`margin-bottom: 16px`
  )};
`;

const ViewCount = styled(Typography)`
  margin-top: 5px;
`;

// 追加する
const StyledFavoriteButton = styled(FavoriteButton)`
  position: absolute;
  right: 2px;
  bottom: 2px;
`;

const VideosListItemPresenter = ({
  className,
  onClick,
  thumbnailUrl,
  title,
  description,
  viewCount,
  withFavoriteButton, // 追加する
  videoId, // 追加する
}) => (
  <Root className={className} onClick={onClick}>
    <Thumbnail>
      <Image src={thumbnailUrl} alt={title} />
    </Thumbnail>
    <InfoWrapper>
      <Typography size="subtitle" bold display="inline-block">{title}</Typography>

      {/* requireMarginForButton={withFavoriteButton} を追加する */}
      <Description requireMarginForButton={withFavoriteButton}>{description}</Description>

      <ViewCount size="xs" color="gray">
        {viewCount}
        回視聴
      </ViewCount>

      {/* 追加する */}
      {withFavoriteButton && (
        <StyledFavoriteButton videoId={videoId} />
      )}

    </InfoWrapper>
  </Root>
);

VideosListItemPresenter.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  thumbnailUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  viewCount: PropTypes.string.isRequired,
  withFavoriteButton: PropTypes.bool, //追加する
  videoId: PropTypes.string, //追加する
};

VideosListItemPresenter.defaultProps = {
  className: '',
  onClick: null,
  withFavoriteButton: false, //追加する
  videoId: '', //追加する
};

const VideosListItemContainer = ({
  className,
  video: {
    id,
    snippet: {
      title,
      description,
      thumbnails: {
        medium: {
          url: thumbnailUrl,
        },
      },
    },
    statistics: {
      viewCount,
    },
  },
  withFavoriteButton, // 追加する
  presenter,
}) => {
	// ページ遷移をさせるため、useHistoryを使ってhistoryオブジェクトを取得
  const history = useHistory();
  return presenter({
    className,
    onClick: () => {
      history.push(`/play/${id}`);
    },
    title,
    thumbnailUrl,
    description,
    viewCount,
    withFavoriteButton, // 追加する
    videoId: id, // 追加する
  });
};

VideosListItemContainer.propTypes = {
  className: PropTypes.string,
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      thumbnails: PropTypes.shape({
        medium: PropTypes.shape({
          url: PropTypes.string,
        }),
      }).isRequired,
    }).isRequired,
    statistics: PropTypes.shape({
      viewCount: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  withFavoriteButton: PropTypes.bool, // 追加する
};

VideosListItemContainer.defaultProps = {
  className: '',
  withFavoriteButton: false, // 追加する
};

export default (props) => (
  <VideosListItemContainer
    presenter={VideosListItemPresenter}
    {...props}
  />
);