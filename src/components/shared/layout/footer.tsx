import dynamic from 'next/dynamic';

const XOutlined = dynamic(() => import('@ant-design/icons/XOutlined'), { ssr: false });
const CloseCircleOutlined = dynamic(() => import('@ant-design/icons/CloseCircleOutlined'), { ssr: false });
const LinkedinOutlined = dynamic(() => import('@ant-design/icons/LinkedinOutlined'), { ssr: false });

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-4 border-t border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Footer Information */}
        <div className="text-sm">
          <span className="block">&copy; 2024</span>
          <p className="text-gray-500">by Awesomit Ltd</p>
        </div>

        {/* Footer Icons */}
        <div className="flex space-x-4">
          <div className="text-gray-500 hover:text-gray-700 transition duration-300">
            <XOutlined style={{ fontSize: '20px' }} />
          </div>
          <div className="text-gray-500 hover:text-gray-700 transition duration-300">
            <CloseCircleOutlined style={{ fontSize: '20px' }} />
          </div>
          <div className="text-gray-500 hover:text-gray-700 transition duration-300">
            <LinkedinOutlined style={{ fontSize: '20px' }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
