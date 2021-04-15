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
                    style={{height: '80vh', width: '90vw'}}
                    boundaryRatioVertical={0.8} 
                    boundaryRatioHorizontal={0.8} 
                    enableBoundingBox
                    maxZoom={3.3}
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