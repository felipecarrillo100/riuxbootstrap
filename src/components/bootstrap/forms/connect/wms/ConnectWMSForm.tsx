import * as React from 'react';
import AbstractForm, {AbstractFormProps, SubmitButtonsRow} from "riux/lib/components/forms/abstract/AbstractForm";
import {Button, ButtonGroup, Form} from "react-bootstrap";
import {connectForm} from "riux/lib/reduxboilerplate/connectForm";


interface State {
    text: string;
}

class ConnectWMSForm extends AbstractForm<AbstractFormProps, State> {
    constructor(props: any) {
        super(props);
        this.setParentTitle('Connect to WMS');
        this.state = {
            text: "abc"
        }
    }

    render(): any {
        return (
            <Form onSubmit={this.onSubmit} style={{width: 480, maxWidth:"100%"}}>
                <Form.Group controlId="test">
                    <Form.Label>This is a sample form</Form.Label>
                    <Form.Control type="text" value={this.state.text} name="text" onChange={this.handleChange}/>
                </Form.Group>
                <hr />
                <Form.Group style={{float: "right"}}>
                    <Button variant="secondary" onClick={this.onCancel} >
                        Close
                    </Button>
                    <Button variant="primary"
                        type="submit"
                        disabled={!this.isReadyToSubmit()}
                    >
                        Commit
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

export default ConnectWMSForm;
