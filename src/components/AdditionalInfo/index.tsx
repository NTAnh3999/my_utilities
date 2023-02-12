import { CardText, CardTitle, Col } from "reactstrap";
import { AdditionalInfoCardProps } from "../../entity";

const AdditionalInfo: React.FC<AdditionalInfoCardProps> = (
  props
): React.ReactElement => {
  return (
    <Col lg="3" className="mt-3">
      <CardTitle tag="h6">{props.title?.toUpperCase()}</CardTitle>
      <CardText>{props.info}</CardText>
    </Col>
  );
};

export default AdditionalInfo;
