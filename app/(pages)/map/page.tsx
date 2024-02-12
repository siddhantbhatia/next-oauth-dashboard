"use client";
import { Select, Spin, Typography } from "antd";
import { useState } from "react";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import getLocationPrediction from "@app/data/get-location-prediction";
import getLocationDetail from "@app/data/get-location-detail";

const OPTIONS = [
  { value: "Burns Bay Road", label: "HAHA1" },
  { value: "Downing Street", label: "HAHA2" },
  { value: "Wall Street", label: "HAHA3" },
];

const { Title } = Typography;

interface SelectOption {
  label: string;
  value: string;
}

export default function MapPage() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [coordinates, setCoordinates] = useState({
    lat: 3.1472732,
    lng: 101.6995352,
  });
  const handleSearch = (value: string) => {
    if (value.length == 2) {
      setOptions(OPTIONS.slice(2));
    } else {
      setOptions(OPTIONS);
    }
  };

  const onSelect = async (option: SelectOption) => {
    const response = await getLocationDetail(option.value);

    if (response.status === "OK") {
      setCoordinates({
        lat: response.results[0].geometry.location.lat,
        lng: response.results[0].geometry.location.lng,
      });
    }
  };

  const getPredictions = async (input: string) => {
    setLoading(true);
    const response = await getLocationPrediction(input);

    if (response.status === "OK") {
      setOptions(
        response.predictions.map((prediction) => ({
          value: prediction.place_id,
          label: prediction.description,
        }))
      );
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        minHeight: "100vh",
      }}
    >
      <Title level={3}>Location search</Title>
      <Select
        labelInValue
        showSearch
        placeholder="Enter location..."
        notFoundContent={loading ? <Spin size="small" /> : null}
        style={{ width: 500 }}
        options={options}
        onSelect={onSelect}
        onSearch={(value: string) => getPredictions(value)}
        onChange={(e) => console.log(e)}
        size="large"
        filterOption={false}
      />
      <Map
        center={{ lat: coordinates.lat, lng: coordinates.lng }}
        defaultZoom={17}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        style={{ height: 500, width: 500 }}
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
