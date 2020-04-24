import React from 'react';
import styles from './HomeModule.less';
import Point from '../../../assets/rightPoint.png';

function  HomeModule(props){
   return(
           <div className={styles.entrance_item}>
               <div className={styles.entrance_desc}>
                   <div className={styles.entrance_desc_box}>
                       <div className={styles.entrance_desc_allow}>
                           <a>
                               <img src={Point} alt="img" />
                           </a>
                       </div>
                       <div className={styles.entrance_desc_cont}>
                           <h4>{props.name}</h4>
                           <p>{props.detail}</p>
                       </div>
                   </div>
               </div>
               <div className={styles.pics}>
                   <a>
                       <img src={props.src} alt="logo" />
                   </a>
               </div>
           </div>
   )

}
export default HomeModule;