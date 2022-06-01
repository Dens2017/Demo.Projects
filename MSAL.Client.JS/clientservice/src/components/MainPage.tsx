import React from 'react';
import { DefaultButton, Label, Stack } from '@fluentui/react';
import { MSGraphCall } from '../services/actions/MSGraphCall';
import { StorageSASfenerator } from '../services/actions/StorageSASfenerator';
import { StorageSASfeneratorGroup } from '../services/actions/StorageSASfeneratorGroup';
import { StorageSASfeneratorCountry } from '../services/actions/StorageSASfeneratorCountry';

interface IMainPageState {
  result: string;
}

export default class MainPage extends React.Component<{}, IMainPageState> {

  constructor(props: any) {
    super(props);
    this.state = {
      result: ""
    }
  }

  public render(): JSX.Element {
    const { result } = this.state;
    console.log("Result", result);
    return (
      <>
        <Stack tokens={{ childrenGap: 10 }}>
          <Label styles={{ root: { fontWeight: 900, paddingLeft: '5px', textAlign: 'center' } }}>MSAL API Actions</Label>
          <Stack horizontal tokens={{ childrenGap: 20 }} styles={{ root: { textAlign: 'center' } }}>
            <DefaultButton text="MS Graph using Client Credential" onClick={this.MSGraphCall} />
            <DefaultButton text="Custom API using Client Credential" onClick={this.StorageSASfenerator} />
            <DefaultButton text="Custom API restricted by Group" onClick={this.StorageSASfeneratorGroup} />
            <DefaultButton text="Custom API restricted by Country" onClick={this.StorageSASfeneratorCountry} />
          </Stack>
          <Stack styles={{ root: { textAlign: 'center' } }}>{result}</Stack>
        </Stack>
      </>
    )
  }

  private MSGraphCall = async (): Promise<any> => {
    let resultText: string = await MSGraphCall.run();
    this.setState({ result: resultText })
  }

  private StorageSASfenerator = async (): Promise<any> => {
    let resultText: string = await StorageSASfenerator.run();
    this.setState({ result: resultText })
  }

  private StorageSASfeneratorGroup = async (): Promise<any> => {
    let resultText: string = await StorageSASfeneratorGroup.run();
    this.setState({ result: resultText })
  }

  private StorageSASfeneratorCountry = async (): Promise<any> => {
    let resultText: string = await StorageSASfeneratorCountry.run();
    this.setState({ result: resultText })
  }

}