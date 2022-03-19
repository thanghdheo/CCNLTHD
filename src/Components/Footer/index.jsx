import React from 'react'
import styled from 'styled-components'
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
function Footer() {
  return (
    <Container>
        <FooterInfo>
            <Title>
                hệ thống cửa hàng hades
            </Title>
            <FooterItem>Hades FLAGSHIP STORE: 69 QUANG TRUNG, GÒ VẤP</FooterItem>
            <FooterItem>Store 2: 26 LÝ TỰ TRỌNG Q.1 ( THE NEW PLAYROUND)</FooterItem>
            <FooterItem>Store 3: 350 ĐIỆN BIÊN PHỦ F17 Q. BÌNH THẠNH (G-TOWN)</FooterItem>
            <FooterItem>Store 4: 4 PHẠM NGŨ LÃO, Q.1</FooterItem>
            <FooterItem>Store 5: 136 NGUYỄN HỒNG ĐÀO, Q.TÂN BÌNH</FooterItem>
            <FooterItem>Store 6: 235 PHAN TRUNG, TP.BIÊN HÒA</FooterItem>
            <FooterItem>Store 7: 15 NGUYỄN VIỆT HỒNG, Q.NINH KIỀU, TP. CẦN THƠ</FooterItem>
            <FooterItem>Store 8: Tầng 7 - tòa B2 - VINCOM BÀ TRIỆU, HÀ NỘI</FooterItem>
        </FooterInfo>
        <FooterInfo>
            <Title>
                chính sách
            </Title>
            <FooterItem>Chính sách sử dụng website</FooterItem>
            <FooterItem>Phương thức thanh toán</FooterItem>
            <FooterItem>Chính sách đổi trả</FooterItem>
            <FooterItem>Chính sách giao nhận - vận chuyển1</FooterItem>
            <FooterItem>Điều khoản dịch vụ</FooterItem>
            <FooterItem>Hướng dẫn mua hàng</FooterItem>
            <FooterItem>Chính sách bảo mật</FooterItem>
        </FooterInfo>
        <FooterInfo>
            <Title>
                thông tin liên hệ
            </Title>
            <FooterItem>CÔNG TY TNHH HADES Địa chỉ: 45 Phan Chu Trinh,</FooterItem>
            <FooterItem>SỐ GCNĐKDN: 0316393653</FooterItem>
            <FooterItem>Ngày cấp: 20/07/2020</FooterItem>
            <FooterItem>Tuyển dụng: hr@hades.vn</FooterItem>
            <FooterItem>Website: hades.vn</FooterItem>
            <FooterItem>Liên hệ CSKH: support@hades.vn</FooterItem>
            <FooterItem>For business: contact@hades.vn</FooterItem>
        </FooterInfo>
        <FooterInfo>
            <Title>
             FOLLOW US ON SOCIAL MEDIA
            </Title>
            <FooterIcon><FacebookOutlined /></FooterIcon>
            <FooterIcon><InstagramOutlined/></FooterIcon>
            <FooterImage src="https://file.hstatic.net/1000306633/file/logo_bct_img_3c1bf699d3004ef2887fee1c4eb20afd.png?v=150" />
        </FooterInfo>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
`

const Title = styled.h4`
    text-transform: uppercase;
    font-size: 15px;
    margin-bottom: 24px;
`

const FooterInfo = styled.div`
    flex: 1;
    padding: 24px;
    font-size: 13px;
`

const FooterItem = styled.p`
    padding: 8px 0;
`

const FooterIcon = styled.i`
    font-size: 32px ;
    margin-right: 12px ;
`

const FooterImage = styled.img`
    width: 150px;
    display: block;
`


export default Footer