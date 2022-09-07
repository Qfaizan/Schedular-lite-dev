import React, { useState, useCallback } from 'react';
import ReactScrollbarsCustom from 'react-scrollbars-custom';
import styled from 'styled-components';
import { colors } from './styles/colors';
interface Props {
  autoHide?: boolean;
  children: React.ReactNode;
  height?: string;
}

const Container = styled.div`
  position: relative !important;
` as any;

const Wrapper = styled.div`
  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
` as any;

const Scroller = styled.div`
  position: absolute !important;
` as any;

const TrackX = styled.div`
  display: none;
` as any;

const ThumbX = styled.div`
  display: none;
` as any;

const TrackYEl = styled.div`
  position: absolute;
  border-radius: 0.25rem;
  width: 0.375rem;
  top: 0.2rem;
  right: 0.2rem;
  bottom: 0.2rem;
  background: none;
  z-index: 10;
` as any;

const ThumbYEl = styled.div`
  background: ${colors.grey80};
  cursor: pointer;
  border-radius: 0.25rem;
` as any;

const Scrollbar: React.FC<Props> = React.memo(({ children, autoHide, height }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const showScrollbar = isScrolling || isMouseOver;

  const onScrollStart = useCallback(() => {
    setIsScrolling(true);
  }, []);
  const onScrollStop = useCallback(() => {
    setIsScrolling(false);
  }, []);
  const onMouseEnter = useCallback(() => {
    setIsMouseOver(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  return (
    <ReactScrollbarsCustom
      style={{ height, width: '100%' }}
      onScrollStart={onScrollStart}
      onScrollStop={onScrollStop}
      noDefaultStyles
      scrollDetectionThreshold={500}
      renderer={({ elementRef, ...restProps }:any) => (
        <Container {...restProps} ref={elementRef} />
      )}
      wrapperProps={{
        renderer: ({ elementRef, ...restProps }:any) => (
          <Wrapper {...restProps} ref={elementRef} />
        ),
      }}
      scrollerProps={{
        renderer: ({ elementRef, ...restProps }:any) => (
          <Scroller {...restProps} ref={elementRef} />
        ),
      }}
      contentProps={{
        renderer: ({ elementRef, ...restProps }:any) => (
          <div {...restProps} ref={elementRef} />
        ),
      }}
      trackXProps={{
        renderer: ({ elementRef, ...restProps }:any) => (
          <TrackX {...restProps} ref={elementRef} />
        ),
      }}
      thumbXProps={{
        renderer: ({ elementRef, ...restProps }:any) => (
          <ThumbX {...restProps} ref={elementRef} />
        ),
      }}
      trackYProps={{
        renderer: ({ elementRef, style, ...restProps }:any) => (
          <TrackYEl
            {...restProps}
            ref={elementRef}
            style={{
              ...style,
              opacity: !autoHide || showScrollbar ? 1 : 0,
              transition: 'opacity 0.4s ease-in-out',
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        ),
      }}
      thumbYProps={{
        renderer: ({ elementRef, ...restProps }:any) => (
          <ThumbYEl {...restProps} ref={elementRef} />
        ),
      }}
    >
      {children}
    </ReactScrollbarsCustom>
  );
});

Scrollbar.defaultProps = {
  autoHide: false,
  height: '100%',
};

export default Scrollbar;
