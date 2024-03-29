import { Component, Prop, State, h } from '@stencil/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { sayHello } from '../../helpers/utils';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {

  @State() state = false;
  @Prop() name: string;

  formattedName(): string {
    if (this.name) {
      return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
    }
    return '';
  }



  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>Profile: {this.name}</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <p>
          {sayHello()}! My name is {this.formattedName()}. My name was passed in through a
          route param!
        </p>

        <ion-item>
          <ion-label>Setting ({this.state.toString()})</ion-label>
          <ion-toggle
            checked={this.state}
            onIonChange={ev => (this.state = ev.detail.checked)}
          />

          <ion-button onClick={_ => { this.camera() }}> </ion-button>
        </ion-item>
      </ion-content>
    ];
  }

  async camera() {
    const ph = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    console.log(ph);
  }
}
