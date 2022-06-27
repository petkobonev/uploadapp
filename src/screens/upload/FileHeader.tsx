import React from 'react';
import {Col, Row} from "reactstrap";

export interface FileHeaderProps {
    file: File;
    progress: Number
}

export function FileHeader({ file, progress}: FileHeaderProps) {
    return (
        <Col>
            <Row style={{justifyContent: "center"}} >{file.name}</Row>
            <Row style={{justifyContent: "center"}} >{progress.toString()}%</Row>
        </Col>
    );
}
