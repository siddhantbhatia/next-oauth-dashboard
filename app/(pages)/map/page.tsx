"use client";
import { Select, Spin, Typography } from "antd";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useDispatch, useSelector } from "@lib/redux";
import {
  selectCoordinate,
  selectPrediction,
  selectPredictionStatus,
} from "@lib/redux/slices/locationSlice";
import {
  getDetailAsync,
  getPredictionAsync,
} from "@lib/redux/slices/locationSlice/thunks";
import debounce from "@app/util/debounce";

const { Title } = Typography;

interface SelectOption {
  label: string;
  value: string;
}

export default function MapPage() {
  const dispatch = useDispatch();
  const options = useSelector(selectPrediction);
  const loading = useSelector(selectPredictionStatus);
  const coordinates = useSelector(selectCoordinate);

  const handleSelect = (option: SelectOption) => {
    dispatch(getDetailAsync(option.value));
  };

  const handleSearch = debounce((input: string) => {
    if (input.trim() === "") {
      return;
    }

    dispatch(getPredictionAsync(input));
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        minHeight: "100vh",
        background: "#80808026",
      }}
    >
      <Title level={3}>Location search</Title>
      <Select
        labelInValue
        showSearch
        allowClear
        placeholder="Enter location..."
        notFoundContent={loading ? <Spin size="small" /> : null}
        loading={Boolean(loading)}
        style={{ width: 500 }}
        options={options.map((option) => ({
          value: option.place_id,
          label: option.description,
        }))}
        onSelect={handleSelect}
        onSearch={(input) => handleSearch(input)}
        size="large"
        filterOption={false}
      />
      <Map
        center={{ lat: coordinates.lat, lng: coordinates.lng }}
        defaultZoom={17}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        style={{ height: 500, width: 500, borderRadius: 8 }}
        mapId={"f24b7abb4f7c7751"}
      >
        <AdvancedMarker
          position={{ lat: coordinates.lat, lng: coordinates.lng }}
        >
          <Pin />
        </AdvancedMarker>
      </Map>
    </div>
  );
}
