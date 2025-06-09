import Skeleton from 'react-native-reanimated-skeleton';
import React from 'react';

const StudyRoomSkeleton = () => {
  return (
    <Skeleton
      layout={[
        {key: 'room', width: '100%', height: 96, borderRadius: 12},
        {key: 'room', width: '100%', height: 96, borderRadius: 12},
        {key: 'room', width: '100%', height: 96, borderRadius: 12},
        {key: 'room', width: '100%', height: 96, borderRadius: 12},
        {key: 'room', width: '100%', height: 96, borderRadius: 12},
      ]}
      containerStyle={{padding: 16, gap: 12}}
      isLoading
    />
  );
};

export default StudyRoomSkeleton;
