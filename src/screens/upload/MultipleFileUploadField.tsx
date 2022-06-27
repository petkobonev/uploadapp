import { useField } from 'formik';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUpload } from './SingleFileUpload';
import { UploadError } from './UploadError';
import {Row} from "reactstrap";

let currentId = 0;

function getNewId() {
    return ++currentId;
}

export interface UploadableFile {
    id: number;
    file: File;
    errors: FileError[];
    url?: string;
}

export function MultipleFileUploadField({ name }: { name: string }) {

    const baseStyle = {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const focusedStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };


    const [_, __, helpers] = useField(name);

    const [files, setFiles] = useState<UploadableFile[]>([]);
    const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
        const mappedAcc = accFiles.map((file) => ({ file, errors: [], id: getNewId() }));
        const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
        setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
    }, []);

    useEffect(() => {
        helpers.setValue(files);
        // helpers.setTouched(true);
    }, [files]);

    function onUpload(file: File, url: string) {
        setFiles((curr) =>
            curr.map((fw) => {
                if (fw.file === file) {
                    return { ...fw, url };
                }
                return fw;
            })
        );
    }

    const { getRootProps, getInputProps, isFocused,
        isDragAccept,
        isDragReject } = useDropzone({
        onDrop,
        accept: ['image/*', 'video/*', '.pdf'],
        maxSize: 300 * 1024, // 300KB
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);


    return (
        <React.Fragment>
            <Row>
                <div {...getRootProps({style})}>
                    <input {...getInputProps()} />

                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </Row>

            {files.map((fileWrapper) => (
                <Row style={{justifyContent: "center"}} key={fileWrapper.id}>
                    {fileWrapper.errors.length ? (
                        <UploadError
                            file={fileWrapper.file}
                            errors={fileWrapper.errors}
                        />
                    ) : (
                        <SingleFileUpload
                            onUpload={onUpload}
                            file={fileWrapper.file}
                        />
                    )}
                </Row>
            ))}
        </React.Fragment>
    );
}
