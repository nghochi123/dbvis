import React from 'react';
import Head from 'next/head';
import {PanZoom} from 'react-easy-panzoom';

import MainLayout from '../layout/mainlayout/MainLayout';

const Test = () => {
    return (
        <>
            <Head>
                <title>Roflmao</title>
            </Head>
            <MainLayout>
                <PanZoom
                    style={{height: '90vh', width: '99vw'}}
                    boundaryRatioVertical={0}
                    boundaryRatioHorizontal={0} 
                    enableBoundingBox
                    maxZoom={3.3}
                    minZoom={0.5}
                >
                    <div>
                        <p>Text here</p>
                    </div>
                </PanZoom>
            </MainLayout>
        </>
    )
}

export default Test;