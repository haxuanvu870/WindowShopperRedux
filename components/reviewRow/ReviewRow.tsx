import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Review } from '../../types/Review';
import { Rating } from 'react-native-ratings';

const { width } = Dimensions.get('screen')

interface IProps {
    review: Review;
}

/**
 * @param {{ 
 * review: Review,
 * }} props 
 * @returns
 */

/**
 * ReviewRow creates a row component for displaying reviews for a selectedItem.
 * This component receives a review object as a prop to populate the data in the component.
 */
const ReviewRow = (props: IProps) => {
    const { review } = props;

    return (
        <View style={styles.container} >
            <View style={styles.reviewHeaderContainer}>
                <Rating
                    type='custom'
                    ratingCount={5}
                    startingValue={Number(review.rating)}
                    imageSize={15}
                    ratingColor='black'
                    tintColor='white'
                    ratingBackgroundColor='white'
                    showRating={false}
                    readonly={true}
                />
                <Text numberOfLines={1} style={styles.title}>{review.date}</Text>
            </View>

            <View style={styles.descriptionContainer}>
                <Text numberOfLines={4} style={styles.descriptionText}>{review.comment}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        height: 160,
        width: width - 12,
        alignItems: 'flex-start',
        marginBottom: 10,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: 'white'
    },

    descriptionContainer: {
        flexDirection: 'row',
        height: '100%',
        width: width - 12,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    descriptionText: {
        fontSize: 14,
        width: '100%',
        color: 'black',
        justifyContent: 'flex-start',
        marginTop: 5,
        marginLeft: 15
    },

    reviewHeaderContainer: {
        flexDirection: 'row',
        display: 'flex',
        height: 25,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 20
    },

    subtext: {
        fontSize: 10,
        flex: 1,
        width: '100%',
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 14,
        width: 100,
        height: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        color: 'black',
        justifyContent: 'flex-start',
        marginLeft: 15
    },

    toolBarContainer: {
        flexDirection: 'row',
        width: width,
        elevation: 6,
        minHeight: 70,
        maxHeight: 70,
        marginBottom: 10,
        backgroundColor: 'white',
        alignItems: 'flex-start'
    },

});

export default ReviewRow;