import BenchBlanking from '@/components/BenchBlanking';
import ConnectingMaterial from '@/components/ConnectingMaterial';
import PrepareMaterial from '@/components/PrepareMaterial';
import StationBlanking from '@/components/StationBlanking';
import { Tabs } from 'antd-mobile';
import './index.less';
export default function HomePage() {
  return (
    <>
      <Tabs>
        <Tabs.Tab title="备料" key="PrepareMaterial">
          <PrepareMaterial />
        </Tabs.Tab>
        <Tabs.Tab title="接料" key="ConnectingMaterial">
          <ConnectingMaterial />
        </Tabs.Tab>
        <Tabs.Tab title="机台下料" key="BenchBlanking">
          <BenchBlanking />
        </Tabs.Tab>
        <Tabs.Tab title="站位下料" key="StationBlanking">
          <StationBlanking />
        </Tabs.Tab>
      </Tabs>
    </>
  );
}
