/* eslint-disable no-unused-vars */
import { ButtonBase, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import PropTypes from "prop-types";

const PdfViewPrimary = (props) => {
  const { pdf, customClass, style } = props;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setpageNumber] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [scale, setscale] = useState(1.5);
  const [rotate, setrotate] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function previous() {
    pageNumber !== 1 && setpageNumber(pageNumber - 1);
  }

  function next() {
    pageNumber !== numPages && setpageNumber(pageNumber + 1);
  }

  function zoomOut() {
    scale !== 1 && setscale(scale - 0.5);
  }

  function zoomIn() {
    scale !== 2 && setscale(scale + 0.5);
  }

  function onClickRotate() {
    if (rotate === 0) {
      setrotate(90);
    } else if (rotate === 90) {
      setrotate(180);
    } else if (rotate === 180) {
      setrotate(270);
    } else {
      setrotate(0);
    }
  }

  return (
    <div className={`pdf-view-primary ${customClass}`} style={style}>
      <div className="pdf-header">
        <div className="page-toggle">
          <ButtonBase className={`icon ${pageNumber === 1 ? "icon-disabled" : ""}`} onClick={previous}>
            <i className="fas fa-chevron-left"></i>
          </ButtonBase>
          <p>
            {pageNumber} of {numPages}
          </p>
          <ButtonBase className={`icon ${pageNumber === numPages ? "icon-disabled" : ""}`} onClick={next}>
            <i className="fas fa-chevron-right"></i>
          </ButtonBase>
        </div>
        <h2>Documents</h2>
        <div className="scale">
          <ButtonBase className="icon" onClick={onClickRotate}>
            <i className="fa-solid fa-rotate"></i>
          </ButtonBase>
          <ButtonBase className={`icon ${scale === 1 ? "icon-disabled" : ""}`} onClick={zoomOut}>
            <i className="fas fa-search-minus"></i>
          </ButtonBase>
          <ButtonBase className={`icon ${scale === 2 ? "icon-disabled" : ""}`} onClick={zoomIn}>
            <i className="fas fa-search-plus"></i>
          </ButtonBase>
        </div>
      </div>
      <div className="pdf">
        <div className="scroll">
          <Document
            loading={
              <div className="pdf-loader">
                <CircularProgress className="spinner" />
                <p>Loading PDF</p>
              </div>
            }
            file={pdf}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              width={screen.width <= 600 ? 250 : 600}
              className="page"
              scale={scale}
              pageNumber={pageNumber}
              rotate={rotate}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

PdfViewPrimary.propTypes = {
  pdf: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  style: PropTypes.object,
};

export default PdfViewPrimary;
