import React from 'react';
import Skeleton from 'react-native-reanimated-skeleton';

const TextSkeleton = () => {
  return <Skeleton layout={[{key: 'someId', width: 80, height: 18}]} isLoading />;
};

export default TextSkeleton;
